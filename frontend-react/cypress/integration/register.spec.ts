import {axify, userLoginResponseFixture, userRegisterFixture} from "../fixtures/register_response_success";
import {instance, mock, when} from "ts-mockito";
import {ClientSingleton} from "../../src/client/ClientSingleton";
import {DefaultApi, UserRegister} from "../../src/client/generated";
import _ from "lodash";

describe("When I go to the site for the first time", () => {
    const expectedRegisterSuccess = userLoginResponseFixture()
    const expectedRegister: UserRegister = userRegisterFixture()
    beforeEach(() => {
        const apiMock: DefaultApi = mock(DefaultApi)
        when(apiMock.apiUserRegisterPost(expectedRegister)).thenResolve(axify(expectedRegisterSuccess, 201))
        const api = instance(apiMock)
        ClientSingleton.setInstance(api)
        ClientSingleton.getInstance()
        cy.clearLocalStorage()
        cy.clearCookies()
        cy.server()

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
        describe("and when I register", () => {
            beforeEach(() => {
                cy.get("#login-register-tabs-tab-register").click()
                cy.get("#register-email").type(expectedRegister.email)
                cy.get("#register-password").type(expectedRegister.password)
                cy.get("button:contains(Submit)").click()
            })
            it("I am registered and it navigates to home", () => {

            })
        })
    })

})