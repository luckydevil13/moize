// test
import test from 'ava';
import _ from 'lodash';
import sinon from 'sinon';

// src
import SingleParameterCacheKey from 'src/SingleParameterCacheKey';

test('if the instance is constructed with the correct values', (t) => {
  const key = ['foo'];

  const result = new SingleParameterCacheKey(key);

  t.deepEqual(
    {...result},
    {
      key: key[0]
    }
  );
});

test('if matches will return false if the key passed is a multi-parameter key', (t) => {
  const existingKey = ['foo'];

  const cacheKey = new SingleParameterCacheKey(existingKey);

  const newKey = ['foo', 'bar'];

  const result = cacheKey.matches(newKey);

  t.false(result);
});

test('if matches will return false if the key passed is not a multi-parameter key that is not equal', (t) => {
  const existingKey = ['foo'];

  const cacheKey = new SingleParameterCacheKey(existingKey);

  const newKey = ['bar'];

  const result = cacheKey.matches(newKey);

  t.false(result);
});

test('if matches will return true if the key passed is not a multi-parameter key that is equal', (t) => {
  const existingKey = ['foo'];

  const cacheKey = new SingleParameterCacheKey(existingKey);

  const newKey = [...existingKey];

  const result = cacheKey.matches(newKey);

  t.true(result);
});

test('if matchesCustom will return false if the key passed is a multi-parameter key', (t) => {
  const existingKey = [{foo: 'foo'}];

  const cacheKey = new SingleParameterCacheKey(existingKey);

  const newKey = [{foo: 'foo'}, {bar: 'bar'}];

  const result = cacheKey.matchesCustom(newKey, _.isEqual);

  t.false(result);
});

test('if matchesCustom will return false if the key passed is not a multi-parameter key that is not equal based on the custom method', (t) => {
  const existingKey = [{foo: 'foo'}];

  const cacheKey = new SingleParameterCacheKey(existingKey);

  const newKey = [{foo: 'bar'}];

  const result = cacheKey.matchesCustom(newKey, _.isEqual);

  t.false(result);
});

test('if matchesCustom will return true if the key passed is not a multi-parameter key that is equal based on the custom method', (t) => {
  const existingKey = [{foo: 'foo'}];

  const cacheKey = new SingleParameterCacheKey(existingKey);

  const newKey = [{foo: 'foo'}];

  const result = cacheKey.matchesCustom(newKey, _.isEqual);

  t.true(result);
});

test('if matchesCustom pases the key to match and the instance key as the parameters to isEqual', (t) => {
  const existingKey = [{foo: 'foo'}];

  const cacheKey = new SingleParameterCacheKey(existingKey);

  const newKey = [{foo: 'foo'}];

  const isEqual = sinon.spy();

  cacheKey.matchesCustom(newKey, isEqual);

  t.true(isEqual.calledOnce);

  const args = isEqual.args[0];

  t.is(args.length, 2);

  const [keyToTest, instanceKey] = args;

  t.is(keyToTest, newKey[0]);
  t.is(instanceKey, existingKey[0]);
});
