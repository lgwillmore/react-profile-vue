import {userLoginResponseFixture, userRegisterFixture} from "../fixtures/register_response_success";
import {UserRegister} from "../../src/client/generated";
import _ from "lodash";

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
                    cy.get("#name-value").contains(expectedRegisterSuccess.user.name || "")
                    cy.get("#surname-value").contains(expectedRegisterSuccess.user.surname || "")
                    cy.get("#email-value").contains(expectedRegisterSuccess.user.email)
                })
            })
        })
    })

})