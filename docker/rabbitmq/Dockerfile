FROM rabbitmq:3-management-alpine

ADD ./docker/rabbitmq/definitions.json /etc/rabbitmq/
ADD ./docker/rabbitmq/rabbitmq.conf /etc/rabbitmq/
RUN rabbitmq-plugins enable --offline rabbitmq_management
CMD rabbitmqctl import_definitions /etc/rabbitmq/definitions.json
CMD rabbitmq-server
