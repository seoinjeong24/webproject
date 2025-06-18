# # 빌드용
# FROM gradle:8.5-jdk17 AS build
# WORKDIR /app
# COPY --chown=gradle:gradle . .
# RUN gradle build --no-daemon
#
# # 실행용
# FROM eclipse-temurin:17-jdk-alpine
# WORKDIR /app
# COPY --from=build /app/build/libs/*.jar app.jar
# EXPOSE 8080
# ENTRYPOINT ["java", "-jar", "app.jar"]


# 1. Build Stage
FROM gradle:8.5-jdk17 AS build
WORKDIR /app

COPY --chown=gradle:gradle build.gradle.kts settings.gradle.kts ./
COPY --chown=gradle:gradle gradle ./gradle

RUN gradle dependencies --no-daemon || true

COPY --chown=gradle:gradle . .

RUN gradle build --no-daemon -x test

# 2. Run Stage
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
