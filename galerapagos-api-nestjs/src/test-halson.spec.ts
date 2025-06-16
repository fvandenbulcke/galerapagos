import halson from 'halson';

type Link = {
  href: string;
  context: string;
};

describe('test halson library', () => {
  test.only('should customize the links with another info', () => {
    const player = {
      id: 'playerId',
      name: 'playerName',
    };

    console.log(halson);

    const response = halson(player).addLink('login', {
      href: 'myPath/login',
      context: 'toto',
    } as Link);
    const expected = {
      id: 'playerId',
      name: 'playerName',
      _links: {
        login: { href: 'myPath/login', context: 'toto' },
      },
    };
    expect(response).toEqual(expected);
  });

  test('should test documentaton example', () => {
    const embed = halson({
      title: 'joyent / node',
      description: 'evented I/O for v8 javascript',
    })
      .addLink('self', '/joyent/node')
      .addLink('author', {
        href: '/joyent',
        title: 'Joyent',
      } as any);

    const resource = halson({
      title: 'john doe',
      username: 'doe',
      emails: ['john.doe@example.com', 'doe@example.com'],
    })
      .addLink('self', '/doe')
      .addEmbed('starred', embed) as any;

    console.log(resource.title);
    console.log(resource.emails[0]);
    console.log(resource.getLink('self'));
    console.log(resource.getEmbed('starred'));
    console.log(JSON.stringify(resource));
  });
});
