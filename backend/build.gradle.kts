plugins {
    kotlin("jvm") version "1.3.72"
    id("org.openapi.generator") version "4.3.1"
    application
}

application {
    mainClassName = "codes.laurence.rpv.web.MainKt"
}

repositories {
    mavenCentral()
    jcenter()
}

val kotlinVersion: String by project
val kotlinXVersion: String by project
val ktorVersion: String by project
val slf4jVersion: String by project
val logbackVersion: String by project

dependencies {
    implementation(kotlin("stdlib"))
    implementation(kotlin("stdlib-jdk8"))
    implementation("org.jetbrains.kotlin", "kotlin-reflect", kotlinVersion)
    implementation("org.jetbrains.kotlinx", "kotlinx-coroutines-core", kotlinXVersion)

    // Ktor
    api("io.ktor", "ktor-server-netty", ktorVersion)

    // Logging
    implementation("org.slf4j", "slf4j-api", slf4jVersion)
    implementation("ch.qos.logback", "logback-core", logbackVersion)
    implementation("ch.qos.logback", "logback-classic", logbackVersion)

    // For generated code
    api("com.squareup.moshi:moshi-kotlin:1.9.2")
    api("com.squareup.moshi:moshi-adapters:1.9.2")
    api("com.squareup.okhttp3:okhttp:4.2.2")
}

openApiValidate {
    inputSpec.set("$rootDir/swagger.yml")
}

openApiGenerate {
    generatorName.set("kotlin")
    inputSpec.set("$rootDir/swagger.yml")
    outputDir.set("$rootDir/backend")
    packageName.set("codes.laurence.rpv.generated")
    skipOverwrite.set(true)
    typeMappings.set(
        mapOf(
            "array" to "kotlin.collections.List"
        )
    )
}

tasks {

    compileKotlin {
        dependsOn("openApiGenerate")
        kotlinOptions.jvmTarget = "1.8"
    }
    compileTestKotlin {
        dependsOn("openApiGenerate")
        kotlinOptions.jvmTarget = "1.8"
    }

    register<Delete>("openAPIGenerateCleanup") {
        delete = setOf(
            "$rootDir/backend/gradle",
            "$rootDir/backend/.gradle",
            "$rootDir/backend/settings.gradle",
            "$rootDir/backend/build.gradle",
            "$rootDir/backend/README.md",
            "$rootDir/backend/docs",
            "$rootDir/backend/.openapi-generator"
        )
    }

    register<Delete>("openAPIGeneratePrep") {
        delete = setOf(
            "$rootDir/backend/gradle",
            "$rootDir/backend/.gradle",
            "$rootDir/backend/settings.gradle",
            "$rootDir/backend/build.gradle",
            "$rootDir/backend/src/kotlin/main/codes/laurence/generated",
            "$rootDir/backend/docs",
            "$rootDir/backend/.openapi-generator"
        )
    }

    getByPath("openApiGenerate").apply {
        dependsOn("openAPIGeneratePrep")
        finalizedBy("openAPIGenerateCleanup")
    }

}


