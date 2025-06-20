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


#Build
FROM gradle:8.5-jdk17 AS build
WORKDIR /app
COPY build.gradle .
COPY settings.gradle .
COPY src ./src

RUN gradle build --no-daemon -x test

#Run
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]