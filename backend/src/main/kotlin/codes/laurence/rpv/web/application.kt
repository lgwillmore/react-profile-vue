package codes.laurence.rpv.web

import codes.laurence.rpv.core.Profiles
import codes.laurence.rpv.generated.models.UserRegister
import codes.laurence.rpv.generated.models.UserUpdate
import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.http.HttpStatusCode
import io.ktor.request.receiveText
import io.ktor.response.respond
import io.ktor.routing.*

fun Application.profiles() {

    val profiles = Profiles()

    routing {
        route("/api/user") {
            get {
                call.respond(HttpStatusCode.Accepted, "Hello")
            }
            route("/register") {
                post {
                    val requestRaw = call.receiveText()
                    val userRegister = fromSwaggerJson<UserRegister>(requestRaw)
                    val registerResponse = profiles.register(userRegister)
                    call.respond(HttpStatusCode.Accepted, toSwaggerJson(registerResponse))
                }
            }
            route("/{id}") {
                put {
                    val requestRaw = call.receiveText()
                    val id = call.parameters["id"]!!
                    val userUpdate = fromSwaggerJson<UserUpdate>(requestRaw)
                    val updateResponse = profiles.update(id, userUpdate)
                    call.respond(HttpStatusCode.Accepted, toSwaggerJson(updateResponse))
                }
            }
        }
    }

}