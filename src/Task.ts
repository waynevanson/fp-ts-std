/**
 * @since 0.1.0
 */

import { Task } from 'fp-ts/Task';
import { IO } from 'fp-ts/IO';

/**
 * Wait for the specified number of milliseconds before resolving.
 *
 * Like `fp-ts/Task::delay`, but doesn't run any underlying task; it simply
 * resolves with void. Can also be useful with async/await (`await sleep(n)()`).
 *
 * @example
 * import { sleep } from 'fp-ts-std/Task';
 * import { sequenceT } from 'fp-ts/Apply';
 * import { pipe } from 'fp-ts/function';
 * import { Task } from 'fp-ts/Task';
 * import * as T from 'fp-ts/Task';
 *
 * const xs: Array<string> = [];
 *
 * const append = (msg: string): Task<void> => T.fromIO(() => {
 *     xs.push(msg);
 * });
 *
 * const instant1 = append('a');
 * const delayed = pipe(sleep(10), T.chain(() => append('b')));
 * const instant2 = append('c');
 *
 * sequenceT(T.task)(instant1, delayed, instant2)().then(() => {
 *     assert.deepStrictEqual(xs, ['a', 'c', 'b']);
 * });
 *
 * @since 0.1.0
 */
export const sleep = (ms: number): Task<void> => () => new Promise<void>((resolve) => {
    // eslint-disable-next-line functional/no-expression-statement
    setTimeout(resolve, Math.floor(ms));
});

/**
 * Calls the callback upon task completion with the number of milliseconds it
 * took for the task to complete. The task otherwise operates as per usual.
 *
 * @example
 * import { elapsed, sleep } from 'fp-ts-std/Task';
 *
 * const wait = sleep(10);
 * let time: number;
 * const waitAndTrackElapsed = elapsed((ms) => () => { time = ms; })(wait);
 *
 * waitAndTrackElapsed().then(() => {
 *     assert.strictEqual(time !== undefined && time > 0, true);
 * });
 *
 * @since 0.5.0
 */
export const elapsed = (f: (ms: number) => IO<void>) => <A>(x: Task<A>): Task<A> => async () => {
    const start = Date.now();
    const y = await x();
    const duration = Date.now() - start;
    // eslint-disable-next-line functional/no-expression-statement
    f(duration)();

    return y;
};

