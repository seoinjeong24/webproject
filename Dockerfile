# 빌드용
FROM gradle:8.2.1-jdk17 AS build

WORKDIR /app
COPY . .

RUN ./gradlew build --no-daemon -x test


# 실행용
FROM openjdk:17-jdk-slim

WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
