FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD M354224331315m
ENV MYSQL_USER crm
ENV MYSQL_PASSWORD crm
ENV MYSQL_DATABASE crmdatabase

EXPOSE 3306

VOLUME /var/lib/mysql

CMD ["mysqld", "--skip-name-resolve=0"]