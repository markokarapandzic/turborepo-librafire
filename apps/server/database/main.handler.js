/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable class-methods-use-this */
const IDMongo = require('./IDMongo');

class MainDBHandler {
  constructor() {
    this.collectionMap = {};
  }

  async getCollection(collection) {
    if (!this.collectionMap[collection]) {
      const coll = await IDMongo.collection(collection);
      this.collectionMap[collection] = coll;
    }
    return this.collectionMap[collection];
  }

  async findOne(collection, query, options = {}) {
    const dbConnection = await getConnection();
    return (await dbConnection.collection(collection)).findOne(query, options);
  }

  async findAll(collection, query, projections = {}, sort = {}) {
    const dbConnection = await getConnection();
    if (Object.keys(sort).length === 0) sort = { createdAt: -1 };
    return (await dbConnection.collection(collection))
      .find(query, projections)
      .sort(sort)
      .toArray();
  }

  async distinct(collection, field, query) {
    const dbConnection = await getConnection();
    return (await dbConnection.collection(collection)).distinct(field, query);
  }

  async count(collection, query, options = {}) {
    const dbConnection = await getConnection();
    return (await dbConnection.collection(collection)).count(query, options);
  }

  async findAndCount(collection, query, options = {}) {
    const dbConnection = await getConnection();
    return (await dbConnection.collection(collection))
      .find(query, options)
      .count();
  }

  async findPaged(collection, query, skip, limit, options = {}) {
    const dbConnection = await getConnection();
    return (await dbConnection.collection(collection))
      .find(query, options)
      .skip(skip)
      .limit(limit)
      .toArray();
  }

  async insertOne(collection, data, options = {}) {
    const dbConnection = await getConnection();
    if (!data.createdAt) data.createdAt = new Date().getTime();
    if (!data.updatedAt) data.updatedAt = new Date().getTime();
    const result = await (
      await dbConnection.collection(collection)
    ).insertOne(data, options);
    return result;
  }

  async insertMany(collection, array, options = {}) {
    const dbConnection = await getConnection();
    array.forEach((data) => {
      if (!data.createdAt) data.createdAt = new Date().getTime();
      if (!data.updatedAt) data.updatedAt = new Date().getTime();
    });
    const result = await (
      await dbConnection.collection(collection)
    ).insertMany(array, options);
    return result.ops;
  }

  async updateCustom(collection, query, data, options = {}) {
    const dbConnection = await getConnection();
    if (!data['$set']) data['$set'] = {};
    if (!data['$set'].updatedAt) data['$set'].updatedAt = new Date().getTime();
    return dbConnection.collection(collection).updateOne(query, data, options);
  }

  async updateOne(collection, query, data, options = {}) {
    const dbConnection = await getConnection();
    if (!data.updatedAt) data.updatedAt = new Date().getTime();
    return dbConnection
      .collection(collection)
      .updateOne(query, { $set: data }, options);
  }

  async findOneAndUpdate(collection, query, data, options = {}) {
    const dbConnection = await getConnection();
    if (!data.updatedAt) data.updatedAt = new Date().getTime();
    return dbConnection
      .collection(collection)
      .findOneAndUpdate(query, { $set: data }, options);
  }

  async updateMany(collection, query, data, options = {}) {
    const dbConnection = await getConnection();
    return dbConnection.collection(collection).updateMany(query, data, options);
  }

  async deleteOne(collection, query, options = {}) {
    const dbConnection = await getConnection();
    return dbConnection.collection(collection).deleteOne(query, options);
  }

  async deleteMany(collection, query, options = {}) {
    const dbConnection = await getConnection();
    return dbConnection.collection(collection).deleteMany(query, options);
  }

  async aggregate(collection, pipelines) {
    const dbConnection = await getConnection();
    return (await dbConnection.collection(collection)).aggregate(pipelines);
  }

  async increment(collection, query, data, options = {}) {
    const dbConnection = await getConnection();
    if (!data.updatedAt) data.updatedAt = new Date().getTime();
    return dbConnection
      .collection(collection)
      .updateOne(query, { $inc: data }, options);
  }
}

const getConnection = async () => {
  const connection = await IDMongo.connect();
  return connection;
};

module.exports = new MainDBHandler();
