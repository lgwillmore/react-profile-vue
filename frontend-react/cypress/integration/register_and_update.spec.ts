import {userLoginResponseFixture, userRegisterFixture} from "../fixtures/register_response_success";
import {UserRegister, UserUpdate} from "../../src/client/generated";
import _ from "lodash";

/**
 * This is a very quick full scenario test. It can be cleaned up to use plugins for common actions
 * and avoid repetition of code.
 */
describe("When I go to the site for the first time", () => {
    beforeEach(() => {
        cy.clearLocalStorage()
        cy.clearCookies()
        cy.server()
        cy.visit("http://localhost:3000")
    })
    it("it displays the home page", () => {
        cy.get("h2").contains("Home")
    })
    describe("and when I navigate to  login/register screen", () => {
        beforeEach(() => {
            cy.get("a:contains(Login/Register)").click()
        })
        it("it goes to the login/register screen", () => {
            cy.get("h2").contains("Login")
        })
        describe("and when I am able to successfully register", () => {
            const expectedRegisterSuccess = userLoginResponseFixture()
            const expectedRegister: UserRegister = userRegisterFixture()
            beforeEach(() => {
                // Setup successful register mock on server
                cy.route({
                    method: "POST",
                    url: "/api/user/register",
                    response: (request: any) => {
                        return expectedRegisterSuccess
                    },
                    onRequest: (xhr) => {
                        if (!_.isEqual(xhr.request.body, expectedRegister)) {
                            throw Error("Wrong thing")
                        }
                    }
                })
                cy.get("#login-register-tabs-tab-register").click()
                cy.get("#register-email").type(expectedRegister.email)
                cy.get("#register-password").type(expectedRegister.password)
                cy.get("button:contains(Submit)").click()
            })
            it("I am forwarded to home", () => {
                cy.get("h2").contains("Home")
            })
            describe("and when I go to the profile page", () => {
                beforeEach(() => {
                    cy.get("a:contains(Profile)").click()
                    cy.get("h2").contains("Profile")
                })
                it("I can see my information", () => {
                    cy.get("#name-value").should("have.value", expectedRegisterSuccess.user.name || "")
                    cy.get("#surname-value").should("have.value", expectedRegisterSuccess.user.surname || "")
                    cy.get("#email-value").should("have.value", expectedRegisterSuccess.user.email)
                })
                describe("and when I edit my information successfully", () => {
                    const change: UserUpdate = {
                        email: expectedRegisterSuccess.user.email + "changed",
                        name: expectedRegisterSuccess.user.name + "changed",
                        surname: expectedRegisterSuccess.user.surname + "changed",
                    }
                    const returnedUser = {
                        ...expectedRegisterSuccess.user,
                        ...change
                    }
                    beforeEach(() => {
                        // Set up the server response
                        cy.route({
                            method: "PUT",
                            url: `/api/user/${expectedRegisterSuccess.user.id}`,
                            response: (request: any) => {
                                return returnedUser
                            },
                            onRequest: (xhr) => {
                                if (!_.isEqual(xhr.request.body, change)) {
                                    throw Error("Wrong thing")
                                }
                            }
                        })
                        cy.get("#edit-button").click()
                        cy.get("#edit-user-email").clear().type(change.email)
                        cy.get("#edit-user-name").clear().type(change.name || "")
                        cy.get("#edit-user-surname").clear().type(change.surname || "")
                        cy.get("#save-button").click()
                    })
                    it("my user information has changed", () => {
                        cy.get("#name-value").should("have.value", change.name)
                        cy.get("#surname-value").should("have.value", change.surname)
                        cy.get("#email-value").should("have.value", change.email)
                    })
                    describe("and when I navigate away and back to profile", () => {
                        beforeEach(() => {
                            cy.get("#cancel-profile").click()
                            cy.get("h2").contains("Home")
                            cy.get("a:contains(Profile)").click()
                            cy.get("h2").contains("Profile")
                        })
                        it("the changes are still there", () => {
                            cy.get("#name-value").should("have.value", change.name)
                            cy.get("#surname-value").should("have.value", change.surname)
                            cy.get("#email-value").should("have.value", change.email)
                        })
                    })
                })
            })
        })
    })
});