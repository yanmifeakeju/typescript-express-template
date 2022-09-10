if ss -lnt | grep -q :$SERVER_PORT; then
 echo "Another process is already listening to port $SERVER_PORT"
 exit 1;
fi

RETRY_INTERVAL=${RETRY_INTERVAL:-0.2}

docker-compose up --no-start
docker-compose start

if  ! npm run migrate:postgres:test; then
  until npm run migrate:postgres:test;  do
    sleep  $RETRY_INTERVAL
  done
fi
npm run start:test &

until ss -lnt | grep -q :$SERVER_PORT; do
 sleep $RETRY_INTERVAL
done

npx cucumber-js -p default

docker-compose down

kill -15 0