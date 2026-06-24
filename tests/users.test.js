import {describe, expect, test} from "@jest/globals"
import axios from "axios";
import Ajv from "ajv"
import schema from "../schemas/users.v1.schema.json"
import {validData, invalidData, maxResponseTime} from "../fixtures/users.fixture.js"

axios.defaults.baseURL = `${process.env.URL}/Users`;
axios.defaults.validateStatus = () => true;

const ajv = new Ajv;
const validateSchema = ajv.compile(schema);
const validateItem = ajv.compile(schema.items);

describe('Api tests for users', () => {
    describe('Positive api tests for users', () => {
        test('should return a non-empty array corresponding to the schema', async () => {
            const startTime = performance.now();
            const getResponse = await axios.get('');
            const endTime = performance.now();
            const getResponseTime = endTime - startTime;
            expect(getResponseTime).toBeLessThan(maxResponseTime);
            expect(getResponse.status).toBe(200);
            expect(Array.isArray(getResponse.data)).toBe(true);
            expect(getResponse.data.length).toBeGreaterThan(0);
            // expect(validateItem(getResponse.data[0])).toEqual(true)      // todo в задании есть проверка 1-го объекта, но дальше проверяется вся data
            expect(validateSchema(getResponse.data)).toEqual(true)
        })
        test.each([2, 3, 4, 5])('should return object by id %i', async (numId) => {
            const getResponse = await axios.get(`${numId}`);
            expect(getResponse.status).toBe(200);
            expect(getResponse.data).toHaveProperty('id', numId);
            expect(validateItem(getResponse.data)).toEqual(true);
        })
        test('should create a new user', async () => {
            const postResponse = await axios.post('', validData);
            expect(postResponse.status).toBe(200);
            expect(postResponse.data).toMatchObject(validData);
            expect(validateItem(postResponse.data)).toEqual(true);
        })
        test('should update user id, name, password', async () => {
            const userId = 5;
            const putResponse = await axios.put(`${userId}`, validData);
            expect(putResponse.status).toBe(200);
            expect(putResponse.data).toMatchObject(validData);
            expect(validateItem(putResponse.data)).toEqual(true);

            // todo проверка на измененного user по новому id, если бы он действительно изменялся
            // const getResponse = await axios.get(`${validData.id}`);
            // expect(getResponse.status).toBe(200);
            // expect(getResponse.data).toMatchObject(validData);
        })
        test('should delete user', async () => {
            const userId = 6;
            const deleteResponse = await axios.delete(`${userId}`);
            expect(deleteResponse.status).toBe(200);

            // todo проверка на удаленного user по id, если бы он действительно удалялся
            // const getResponse = await axios.get(`${userId}`)
            // expect(getResponse.status).toBe(404);
            // expect(getResponse.data.title).toBe('Not Found');
        })
    })
    describe('Negative api test for users', () => {
        test('should return error from get user with non-existent id', async () => {
            const numId = 999999999;
            const getResponse = await axios.get(`${numId}`);
            expect(getResponse.status).toBe(404);
            expect(getResponse.data.title).toBe('Not Found');
            // expect(getResponse.status < 200 || getResponse.status > 300).toBe(true); // todo или такая проверка
        })
        test('should return error from change user with invalid body', async () => {
            const userId = 7;
            const putResponse = await axios.put(`${userId}`, invalidData);
            expect(putResponse.status).toBe(400);
            expect(putResponse.data.title).toBe('One or more validation errors occurred.');
        })
        test('should return error from delete user with invalid id ', async () => {
            const userId = true;
            const deleteResponse = await axios.delete(`${userId}`);
            expect(deleteResponse.status).toBe(400);
            expect(deleteResponse.data.title).toBe('One or more validation errors occurred.');
        })
    })
})