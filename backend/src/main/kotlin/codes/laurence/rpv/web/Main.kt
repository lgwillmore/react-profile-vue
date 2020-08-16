package codes.laurence.rpv.web

import io.ktor.application.Application
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty

fun main() {
    embeddedServer(
        Netty,
        5000,
        module = Application::profiles
    ).start()
}