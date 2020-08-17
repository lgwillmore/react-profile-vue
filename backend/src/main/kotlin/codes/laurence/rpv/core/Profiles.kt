package codes.laurence.rpv.core

import codes.laurence.rpv.generated.models.User
import codes.laurence.rpv.generated.models.UserLoginResponse
import codes.laurence.rpv.generated.models.UserRegister
import codes.laurence.rpv.generated.models.UserUpdate
import kotlin.random.Random

class Profiles {

    private var idCounter = 0
    private val usersByID = mutableMapOf<String, MetaUser>()
    private val userIDbyToken = mutableMapOf<String, String>()

    fun register(userRegister: UserRegister): UserLoginResponse {
        idCounter++
        val id = "u$idCounter"
        val token = "${Random.nextDouble()}"
        userIDbyToken[token] = id
        val newUser = MetaUser(
            user = User(
                id = id,
                name = null,
                surname = null,
                email = userRegister.email
            ),
            password = userRegister.password
        )
        usersByID[id] = newUser
        return UserLoginResponse(
            token = token,
            user = newUser.user
        )
    }

    fun update(id: String, userUpdate: UserUpdate): User {
        val meta = usersByID[id] ?: throw Exception("Not Found")
        meta.user = meta.user.copy(
            name = userUpdate.name,
            surname = userUpdate.surname,
            email = userUpdate.email
        )
        return meta.user
    }

}

data class MetaUser(
    var user: User,
    var password: String
)