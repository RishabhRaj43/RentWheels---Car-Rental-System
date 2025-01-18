import nodeCache from "node-cache";

const cache = new nodeCache({ stdTTL: 120, checkperiod: 120 }); // 2 minutes

export default cache;
