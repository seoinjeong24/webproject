# 1단계: 빌드용
FROM gradle:8.2.1-jdk17 AS build

WORKDIR /app
COPY . .
RUN ./gradlew build --no-daemon -x test

# 2단계: 실행용
FROM openjdk:17-jdk-slim

WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080
