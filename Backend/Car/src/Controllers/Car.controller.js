import Car from "../Models/Car.model.js";
import carValidationSchema from "../Validation/Validate.js";
import cache from "../Config/Cache/cacheConfig.js";
import cloudinary from "cloudinary";

export const getAllCars = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "createdAt",
      order = "desc",
      isDeprecated = false,
      fuelType,
      transmission,
      brand,
    } = req.query;

    const skip = (page - 1) * limit;
    const query = {};

    if (!isDeprecated) query.isDeprecated = false;
    if (fuelType) query.fuelType = fuelType;
    if (transmission) query.transmission = transmission;
    if (brand) query.brand = brand;

    const cacheKey = `query_cars_${page}_${limit}_${sort}_${order}_${isDeprecated}_${fuelType}_${transmission}_${brand}`;

    const cachedCars = cache.get(cacheKey);

    if (cachedCars) {
      return res.status(200).json({ cars: cachedCars });
    }

    const cars = await Car.find(query)
      .sort({ [sort]: order === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(limit);

    cache.set(cacheKey, cars);

    return res.status(200).json({ cars });
  } catch (error) {
    console.error("Error in getAllCars controller: ", error.message);
    return res.status(500).json({ message: "Error getting all cars" });
  }
};

export const getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);

    const cacheKey = `car_${id}`;

    const cachedCar = cache.get(cacheKey);

    if (cachedCar) {
      return res.status(200).json({ car: cachedCar });
    }

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    cache.set(cacheKey, car);

    return res.status(200).json({ car });
  } catch (error) {
    console.error("Error in getCarById controller: ", error.message);
    return res.status(500).json({ message: "Error getting car by ID" });
  }
};

export const createCar = async (req, res) => {
  try {
    const { error } = carValidationSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const validationErrors = error.details.map((detail) => detail.message);
      return res.status(400).json({ message: validationErrors });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const urls = req.files.map((file) => file.filename);

    req.body.images = urls;
    req.body.features = req.body.features
      .split(",")
      .map((feature) => feature.trim());

    const car = new Car({ ...req.body });

    await car.save();

    return res.status(200).json({ message: "Car created successfully", car });
  } catch (error) {
    console.error("Error in createCar controller: ", error.message);
    return res.status(500).json({ message: "Error creating car" });
  }
};

export const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    let { olderImages } = req.body;

    olderImages =
      olderImages && olderImages.split(",").map((image) => image.trim());

    if (olderImages && olderImages.length > 0) {
      for (const public_id of olderImages) {
        try {
          await cloudinary.v2.uploader.destroy(public_id);
        } catch (error) {
          throw new Error("Error deleting image");
        }
      }
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No Images uploaded",
      });
    }
    if (req.files && req.files.length > 0) {
      const urls = req.files.map((file) => file.filename);
      req.body.images = urls;
    }

    car.name = req.body.name || car.name;
    car.brand = req.body.brand || car.brand;
    car.model = req.body.model || car.model;
    car.year = req.body.year || car.year;
    car.price = req.body.price || car.price;
    car.fuelType = req.body.fuelType || car.fuelType;
    car.mileage = req.body.mileage || car.mileage;
    car.seats = req.body.seats || car.seats;
    car.transmission = req.body.transmission || car.transmission;
    car.color = req.body.color || car.color;
    car.description = req.body.description || car.description;
    car.features = req.body.features
      ? req.body.features.split(",").map((feature) => feature.trim())
      : car.features;
    car.images = req.body.images || car.images;

    await car.save();

    const keys = cache.keys();
    for (const key of keys) {
      if (key.startsWith("query_cars") || key.includes(`${id}`)) {
        cache.del(key);
      }
    }

    return res.status(200).json({ message: "Car updated successfully", car });
  } catch (error) {
    console.error("Error in updateCar controller: ", error.message);
    return res.status(500).json({ message: "Error updating car" });
  }
};

export const deprecateCar = async (req, res) => {
  try {
    const { id } = req.params;

    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    car.isDeprecated = !car.isDeprecated;
    await car.save();

    const keys = cache.keys();
    for (const key of keys) {
      if (key.startsWith("query_cars") || key.includes(`${id}`)) {
        cache.del(key);
      }
    }

    return res.status(200).json({
      message: car.isDeprecated ? "Car deprecated" : "Car reactivated",
    });
  } catch (error) {
    console.error("Error in deprecateCar controller: ", error.message);
    return res.status(500).json({ message: "Error deprecating car" });
  }
};
