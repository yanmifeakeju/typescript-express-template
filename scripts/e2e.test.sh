if ss -lnt | grep -q :$SERVER_PORT; then
 echo "Another process is already listening to port $SERVER_PORT"
 exit 1;
fi

RETRY_INTERVAL=${RETRY_INTERVAL:-0.2}

npm run docker:up
npm run migrate:postgres:test

npm run start:test &

until ss -lnt | grep -q :$SERVER_PORT; do
 sleep $RETRY_INTERVAL
done

npx cucumber-js -p default
npm run docker:down

kill -15 0