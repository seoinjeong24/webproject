FROM openjdk:17-jdk-slim

WORKDIR /app

COPY build/libs/*.jar app.jar

EXPOSE 8000

CMD ["java", "-jar", "app.jar"]
