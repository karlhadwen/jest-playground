import pizzas from '../data';

// very basic test to notify the user if our pizza data has changed
test('the pizza data is correct', () => {
  expect(pizzas).toMatchSnapshot();
  expect(pizzas).toHaveLength(4);
  expect(pizzas.map(pizza => pizza.name)).toEqual([
    'Chicago Pizza',
    'Neapolitan Pizza',
    'New York Pizza',
    'Sicilian Pizza',
  ]);
});

// let's test that each item in the pizza data has the correct properties
for (let i = 0; i < pizzas.length; i += 1) {
  it(`pizza[${i}] should have properties (id, name, image, desc, price)`, () => {
    expect(pizzas[i]).toHaveProperty('id');
    expect(pizzas[i]).toHaveProperty('name');
    expect(pizzas[i]).toHaveProperty('image');
    expect(pizzas[i]).toHaveProperty('desc');
    expect(pizzas[i]).toHaveProperty('price');
  });
}

// default jest mock function
test('mock implementation of a basic function', () => {
  const mock = jest.fn(() => 'I am a mock function');

  expect(mock('Calling my mock function!')).toBe('I am a mock function');
  expect(mock).toHaveBeenCalledWith('Calling my mock function!');
});

// let's mock the return value and test calls
test('mock return value of a function one time', () => {
  const mock = jest.fn();

  // we can chain these!
  mock.mockReturnValueOnce('Hello').mockReturnValueOnce('there!');

  mock(); // first call 'Hello'
  mock(); // second call 'there!'

  expect(mock).toHaveBeenCalledTimes(2); // we know it's been called two times

  mock('Hello', 'there', 'Steve'); // call it with 3 different arguments
  expect(mock).toHaveBeenCalledWith('Hello', 'there', 'Steve');

  mock('Steve'); // called with 1 argument
  expect(mock).toHaveBeenLastCalledWith('Steve');
});

// let's mock the return value
// difference between mockReturnValue & mockImplementation
test('mock implementation of a function', () => {
  const mock = jest.fn().mockImplementation(() => 'United Kingdom');
  expect(mock('Location')).toBe('United Kingdom');
  expect(mock).toHaveBeenCalledWith('Location');
});

// spying on a single function of an imported module, we can spy on its usage
// by default the original function gets called, we can change this
test('spying using original implementation', () => {
  const pizza = {
    name: n => `Pizza name: ${n}`,
  };
  const spy = jest.spyOn(pizza, 'name');
  expect(pizza.name('Cheese')).toBe('Pizza name: Cheese');
  expect(spy).toHaveBeenCalledWith('Cheese');
});

// we can mock the implementation of a function from a module
test('spying using mockImplementation', () => {
  const pizza = {
    name: n => `Pizza name: ${n}`,
  };
  const spy = jest.spyOn(pizza, 'name');
  spy.mockImplementation(n => `Crazy pizza!`);

  expect(pizza.name('Cheese')).toBe('Crazy pizza!');
  spy.mockRestore(); // back to original implementation
  expect(pizza.name('Cheese')).toBe('Pizza name: Cheese');
});

// let's test pizza return output
test('pizza returns new york pizza last', () => {
  const pizza1 = pizzas[0];
  const pizza2 = pizzas[1];
  const pizza3 = pizzas[2];
  const pizza = jest.fn(currentPizza => currentPizza.name);

  pizza(pizza1); // chicago pizza
  pizza(pizza2); // neapolitan pizza
  pizza(pizza3); // new york pizza

  expect(pizza).toHaveLastReturnedWith('New York Pizza');
});

// let's match some data against our object
test('pizza data has new york pizza and matches as an object', () => {
  const newYorkPizza = {
    id: 3,
    name: 'New York Pizza',
    image: '/images/ny-pizza.jpg',
    desc:
      'New York-style pizza has slices that are large and wide with a thin crust that is foldable yet crispy. It is traditionally topped with tomato sauce and mozzarella cheese.',
    price: 8,
  };
  expect(pizzas[2]).toMatchObject(newYorkPizza);
});

// async example, always return a promise (can switch out resolves with reject)
test('expect a promise to resolve', async () => {
  const user = {
    getFullName: jest.fn(() => Promise.resolve('Karl Hadwen')),
  };
  await expect(user.getFullName('Karl Hadwen')).resolves.toBe('Karl Hadwen');
});

test('expect a promise to reject', async () => {
  const user = {
    getFullName: jest.fn(() =>
      Promise.reject(new Error('Something went wrong'))
    ),
  };
  await expect(user.getFullName('Karl Hadwen')).rejects.toThrow(
    'Something went wrong'
  );
});
