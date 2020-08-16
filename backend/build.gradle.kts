plugins {
    kotlin("jvm") version "1.3.72"
    id("org.openapi.generator") version "4.3.1"
}

repositories {
    mavenCentral()
}

val kotlinVersion: String by project
val kotlinXVersion: String by project

dependencies {
    implementation(kotlin("stdlib"))
    implementation(kotlin("stdlib-jdk8"))
    implementation("org.jetbrains.kotlin", "kotlin-reflect", kotlinVersion)
    implementation("org.jetbrains.kotlinx", "kotlinx-coroutines-core", kotlinXVersion)

    // For generated
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
