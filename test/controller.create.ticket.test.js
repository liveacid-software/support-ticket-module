const supportTicketController = require('../api/controller');
const MockExpressResponse = require('mock-express-response');
const sinon = require('sinon')
const sandbox = sinon.createSandbox()
const axios = require('axios')
const gitHubIssueResponse = require('./github.response.json')
const ticket = require('../api/ticket')
const nodemailer = require('nodemailer');
const expect = require('chai').expect

var response = new MockExpressResponse();
const testTicket = {
    "_id": "6334e6ca5436dc4c52935d59",
    "submittedBy": "5fd79f7adc47771eb59030ee",
    "subject": "This is a test subject",
    "body": "there is a problem",
    "priority": "emergency",
    "createdAt": {
        "$date": {
            "$numberLong": "1664411338808"
        }
    },
    "updatedAt": {
        "$date": {
            "$numberLong": "1664411338808"
        }
    },
    "__v": 0
}
describe('support ticket', () => {
    describe('create ticket', () => {
        let postStub
        beforeEach(() => {
            postStub = sandbox.stub(axios, 'post').resolves(gitHubIssueResponse)
            sandbox.stub(ticket, 'saveTicket').resolves(testTicket)
        })
        afterEach(() => {
            sandbox.restore()
        })

        it('sends email and generates github issue', () => {
            expect(postStub.notCalled)
            return supportTicketController.createTicket({
                user: {
                    _id: '6334e84046d9b54a3e896107',
                    specialty: [],
                    deactivated: false,
                    deleted: false,
                    first_name: 'Jason',
                    last_name: 'Fabi',
                    email: 'jlfabi25@gmail.com',
                    phone: '18608366474',
                    type: 'admin',
                    hospital: null,
                    charterPassenger: false,
                    password: '$2a$08$bt6wHdTCzb8IMMzbB01kZO9IJwHh6G767Kq/oqshWGFqj7cwxDw8i',
                    createdAt: '2022-09-29T00:35:12.888Z',
                    updatedAt: '2022-09-29T00:35:12.888Z',
                    __v: 0
                },
                body: testTicket
            }, response)
                .then(() => {
                    expect(postStub.calledOnce)
                }).catch((error) => {
                    console.log('error', error)
                })
        })
    })
})
