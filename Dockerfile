FROM openjdk:17-jdk-alpine3.14

WORKDIR /app/backend

COPY . /app

RUN chmod +x ./gradlew && 	./gradlew build && ./gradlew bootJar

EXPOSE 8443

CMD ["java", "-jar", "/app/backend/build/libs/Customer-Relationship-Management-0.0.2-SNAPSHOT.jar"]
