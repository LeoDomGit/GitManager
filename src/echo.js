import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'pusher',
    key: '5998a963e5455c1128a1',
    cluster: 'ap1',
    forceTLS: true,
});

export default echo;