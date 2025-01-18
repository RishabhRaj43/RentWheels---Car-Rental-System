import cahce from "node-cache";

const cache = new cahce({ stdTTL: 900 }); // 15 minutes

export default cache;
