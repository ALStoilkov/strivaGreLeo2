import supertest from "supertest"
import server from "../server"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { Accomodation } from "../services/Destinations"
import { response } from "express"

dotenv.config()
const request = supertest(server)

describe("Testing suite #1", () => {
  beforeAll((done) => {
    mongoose
      .connect(process.env.ATLAS_TEST_URL!, { useNewUrlParser: true })
      .then(() => {
        console.log("Connected to Atlas")
        done()
      })
  })

  it("should test that true is true", () => {
    expect(true).toBe(true)
  })

  it("should test that /accomodation is returning 200", async () => {
    const response = await request.get("/accomodation")
    expect(response.status).toBe(200)
  })

  const validAccomodation = {
    name: "place",
    description: "description",
    maxGuests: 0,
    city: "London",
  }

  it("should test that we can POST a new accomodation", async () => {
    const response = await request.post("/accomodation").send(validAccomodation)

    expect(response.status).toBe(201)
    expect(typeof response.body._id).toBe("string")
  })

  it("should test that we can GET an accomodation with the given id", async () => {
    const newAccResponse = await request
      .post("/accomodation")
      .send(validAccomodation)

    const { _id } = newAccResponse.body
    const response = await request.get(`/accomodation/${_id}`)

    expect(response.status).toBe(200)
    expect(response.body.name).toBe(validAccomodation.name)
  })

  const validAccMod = {
    name: "newName",
    description: "newDescription",
    maxGuests: 1,
    city: "Lisbon",
  }

  it("should test that we can PUT an accomodation", async () => {
    const newAccResponse = await request
      .post("/accomodation")
      .send(validAccomodation)

    const { _id } = newAccResponse.body
    const response = await request.put(`/accomodation/${_id}`).send(validAccMod)

    expect(response.status).toBe(200)
    expect(response.body.city).toBe(validAccMod.city)
  })

  it("should test that we can DELETE an accomodation with a given id", async () => {
    const newAccResponse = await request
      .post("/accomodation")
      .send(validAccomodation)
    const { _id } = newAccResponse.body

    const response = await request.del(`/accomodation/${_id}`)
    expect(response.status).toBe(204)

    const getResponse = await request.get(`/accomodation/${_id}`)
    expect(getResponse.status).toBe(404)
  })

  it("should test that we can GET all unique destinations", async () => {
    const newAccResponse = await request
      .post("/accomodation")
      .send(validAccomodation)
    const { city } = newAccResponse.body

    const response = await request.get(`/destinations`)
    expect(response.status).toBe(200)
    expect(response.body).toContain(city)
  })

  it("should test that we can GET all accomodations for a given city", async () => {
    const newAccResponse = await request
      .post("/accomodation")
      .send(validAccomodation)
    const { city } = newAccResponse.body

    const response = await request.get(`/destinations/${city}`)
    expect(response.status).toBe(200)
    response.body.forEach((acc: Accomodation) => {
      expect(acc.city).toBe(city)
    })
  })

  afterAll((done) => {
    mongoose.connection.dropDatabase().then(() => {
      mongoose.connection.close().then(done)
    })
  })
})
