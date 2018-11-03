# Speedsters

A simple way of tracking your javascript app speed.

#### SETUP
In your main/root js file import `@speedsters/react` and initiate the connection.

```js
import jsnpp from '@speedsters/performance';

const connectionOptions = {
  name: 'My Application name',
};

jsnpp.connect(connectionOptions);

```

#### Start/Stop a performance
Once you've connected you're ready to go.

```js
import jsnpp from '@speedsters/performance';

/*
 * jsnpp.start(@key, @group, @options);
 * @key: The performance name.
 * @group: You can group multiple @keys.
 * @options: { milliseconds } // how long this performance should tale.
 */

/*
 * The start method returns a object and on that
 * object return a stop() method that you can use
 * to stop the performance
*/
const track_a = jsnpp.start('initial-loading');
track_a.stop();


// You can just call start/stop as well
const homePageGroupKeyName = 'home-page';
jsnpp.start('loop-data', homePageGroupKeyName);
jsnpp.stop('loop-data-2', homePageGroupKeyName);

const track_c = jsnpp.start('page-transition', homePageGroupKeyName, {
  milliseconds: 1000,
});
track_c.stop();


const track_d = jsnpp.start('image-load', null, {
  milliseconds: 2000,
});

track_d.stop();

```