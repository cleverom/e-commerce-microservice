import supertest from 'supertest';

import app from '../app'


const request = supertest(app)


describe('checking WRONG GET requests', () => {
    describe('GET/', () => {
        it('should return RESPONSE 404 FOR all data', async () => {
            const res = await request.get('/api/dat')

            expect(res.status).toBe(404)
        })

        it('should return RESPONSE 404 FOR single data', async () => {
            const res = await request.get('/api/d')

            expect(res.status).toBe(404)
        })
    })
})

// describe('Post to Endpoints', () => {

//     it('should create a post', async (done) => {
//         const res = await request
//             .post('/product')
//             .send({
//                 "name": "clever",
//                 "dexcription": "price",
//                 "price": 200
//             })
//         expect(res.status).toEqual(201)
//         done()
//     })

//     it('should not create a post, return response 404', async (done) => {
//         const res = await request
//             .post('/api/123')
//             .send({
//                 "name": "clever",
//                 "dexcription": "price",
//                 "price": 200
//             })
//         expect(res.status).toEqual(404)
//         done()
//     })
// })
