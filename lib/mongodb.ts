
// Enhanced Mock MongoDB implementation with better error handling
export interface MongoDocument {
  _id: string
  createdAt: Date
  updatedAt: Date
}

class MockMongoDB {
  private collections: Map<string, any[]> = new Map()
  private initialized = false

  constructor() {
    this.initializeCollections()
  }

  private initializeCollections() {
    try {
      // Initialize collections
      this.collections.set("customers", [])
      this.collections.set("products", [])
      this.initialized = true
    } catch (error) {
      console.error("Failed to initialize collections:", error)
      this.initialized = false
    }
  }

  async connect() {
    // Mock connection - always resolves
    return Promise.resolve()
  }

  collection(name: string) {
    if (!this.initialized) {
      this.initializeCollections()
    }

    if (!this.collections.has(name)) {
      this.collections.set(name, [])
    }

    return {
      find: (query: any = {}) => ({
        toArray: () => {
          try {
            const data = this.collections.get(name) || []
            if (Object.keys(query).length === 0) return Promise.resolve(data)

            return Promise.resolve(
              data.filter((item) => {
                return Object.keys(query).every((key) => {
                  if (key === "_id") return item._id === query[key]
                  if (query[key] && typeof query[key] === "object" && query[key].$ne) {
                    return item[key] !== query[key].$ne
                  }
                  return item[key] === query[key]
                })
              }),
            )
          } catch (error) {
            console.error("Error in find.toArray:", error)
            return Promise.resolve([])
          }
        },
        skip: (offset: number) => ({
          limit: (limit: number) => ({
            toArray: () => {
              try {
                const data = this.collections.get(name) || []
                return Promise.resolve(data.slice(offset, offset + limit))
              } catch (error) {
                console.error("Error in skip.limit.toArray:", error)
                return Promise.resolve([])
              }
            },
          }),
        }),
        count: () => {
          try {
            return Promise.resolve((this.collections.get(name) || []).length)
          } catch (error) {
            console.error("Error in count:", error)
            return Promise.resolve(0)
          }
        },
      }),

      findOne: (query: any) => {
        try {
          const data = this.collections.get(name) || []
          const result = data.find((item) => {
            return Object.keys(query).every((key) => {
              if (key === "_id") return item._id === query[key]
              return item[key] === query[key]
            })
          })
          return Promise.resolve(result || null)
        } catch (error) {
          console.error("Error in findOne:", error)
          return Promise.resolve(null)
        }
      },

      insertOne: (doc: any) => {
        try {
          const data = this.collections.get(name) || []
          const newDoc = {
            ...doc,
            _id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            createdAt: new Date(),
            updatedAt: new Date(),
          }
          data.push(newDoc)
          this.collections.set(name, data)
          return Promise.resolve({ insertedId: newDoc._id, acknowledged: true })
        } catch (error) {
          console.error("Error in insertOne:", error)
          return Promise.resolve({ insertedId: null, acknowledged: false })
        }
      },

      updateOne: (query: any, update: any) => {
        try {
          const data = this.collections.get(name) || []
          const index = data.findIndex((item) => {
            return Object.keys(query).every((key) => {
              if (key === "_id") return item._id === query[key]
              return item[key] === query[key]
            })
          })

          if (index !== -1) {
            data[index] = {
              ...data[index],
              ...update.$set,
              updatedAt: new Date(),
            }
            this.collections.set(name, data)
            return Promise.resolve({ matchedCount: 1, modifiedCount: 1, acknowledged: true })
          }
          return Promise.resolve({ matchedCount: 0, modifiedCount: 0, acknowledged: true })
        } catch (error) {
          console.error("Error in updateOne:", error)
          return Promise.resolve({ matchedCount: 0, modifiedCount: 0, acknowledged: false })
        }
      },

      deleteOne: (query: any) => {
        try {
          const data = this.collections.get(name) || []
          const index = data.findIndex((item) => {
            return Object.keys(query).every((key) => {
              if (key === "_id") return item._id === query[key]
              return item[key] === query[key]
            })
          })

          if (index !== -1) {
            data.splice(index, 1)
            this.collections.set(name, data)
            return Promise.resolve({ deletedCount: 1, acknowledged: true })
          }
          return Promise.resolve({ deletedCount: 0, acknowledged: true })
        } catch (error) {
          console.error("Error in deleteOne:", error)
          return Promise.resolve({ deletedCount: 0, acknowledged: false })
        }
      },

      countDocuments: (query: any = {}) => {
        try {
          const data = this.collections.get(name) || []
          if (Object.keys(query).length === 0) return Promise.resolve(data.length)

          const filtered = data.filter((item) => {
            return Object.keys(query).every((key) => {
              if (key === "_id") return item._id === query[key]
              return item[key] === query[key]
            })
          })
          return Promise.resolve(filtered.length)
        } catch (error) {
          console.error("Error in countDocuments:", error)
          return Promise.resolve(0)
        }
      },
    }
  }
}

// Create singleton instance
let mockDBInstance: MockMongoDB | null = null

export const getMockDB = () => {
  if (!mockDBInstance) {
    mockDBInstance = new MockMongoDB()
  }
  return mockDBInstance
}

export const mockDB = getMockDB()

// Initialize with sample data - with error handling
const initializeData = async () => {
  try {
    const customers = mockDB.collection("customers")
    const products = mockDB.collection("products")

    // Check if data already exists
    const existingCustomers = await customers.find().toArray()
    const existingProducts = await products.find().toArray()

    if (existingCustomers.length === 0) {
      await customers.insertOne({
        name: "John Doe",
        email: "john@example.com",
        phone: "+1-555-0123",
        address: "123 Main St",
        location: "New York",
        status: "Active",
      })

      await customers.insertOne({
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+1-555-0124",
        address: "456 Oak Ave",
        location: "Los Angeles",
        status: "Active",
      })

      await customers.insertOne({
        name: "Mike Johnson",
        email: "mike@example.com",
        phone: "+1-555-0125",
        address: "789 Pine St",
        location: "Chicago",
        status: "Inactive",
      })
    }

    if (existingProducts.length === 0) {
      await products.insertOne({
        name: "Premium Plan",
        description: "Full-featured premium subscription",
        price: 29,
        inventory: 1000,
        category: "Subscription",
        status: "Active",
      })

      await products.insertOne({
        name: "Basic Plan",
        description: "Essential features for small teams",
        price: 9,
        inventory: 1000,
        category: "Subscription",
        status: "Active",
      })

      await products.insertOne({
        name: "Enterprise Plan",
        description: "Advanced features for large organizations",
        price: 99,
        inventory: 1000,
        category: "Subscription",
        status: "Active",
      })
    }
  } catch (error) {
    console.error("Failed to initialize data:", error)
  }
}

// Initialize data with delay to ensure proper setup
if (typeof window !== "undefined") {
  setTimeout(initializeData, 100)
} else {
  initializeData()
}
