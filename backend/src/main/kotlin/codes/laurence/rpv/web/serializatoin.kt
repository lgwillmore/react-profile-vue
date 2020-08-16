package codes.laurence.rpv.web

import codes.laurence.rpv.generated.infrastructure.Serializer

inline fun <reified T> fromSwaggerJson(json: String): T {
    return Serializer.moshi.adapter(T::class.java).fromJson(json)!!
}

inline fun <reified T> toSwaggerJson(content: T): String {
    return Serializer.moshi.adapter(T::class.java).toJson(content)
}