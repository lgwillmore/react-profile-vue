plugins {
    id("org.openapi.generator") version "4.3.1"
}

val swaggerPath = "$rootDir/swagger.yml"
val generationPath = "$projectDir/src/client/generated"

openApiValidate {
    inputSpec.set(swaggerPath)
}

openApiGenerate {
    generatorName.set("typescript-axios")

    inputSpec.set(swaggerPath)
    outputDir.set(generationPath)
    skipOverwrite.set(false)
}

tasks {
    register(name = "npmInstall", type = Exec::class) {
        executable = "npm"
        args("install")
    }

    register(name = "npmBuild", type = Exec::class) {
        executable = "npm"
        args("run", "build")
        dependsOn(
            "npmInstall"
        )
    }
}