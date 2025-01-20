import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 900 }); // 15 mins

export default cache;