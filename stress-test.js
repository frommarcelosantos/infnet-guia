import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },  // sobe para 10 usuários
    { duration: '1m',  target: 50 },  // sobe para 50 usuários
    { duration: '30s', target: 100 }, // sobe para 100 usuários
    { duration: '30s', target: 0 },   // desce para 0
  ],
};

export default function () {
  const res = http.get('http://127.0.0.1:59538/');
  
  check(res, {
    'status 200': (r) => r.status === 200,
    'tempo abaixo de 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}