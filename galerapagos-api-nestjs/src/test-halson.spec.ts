import halson from 'halson';

type Link = {
  href: string;
  context: string;
};

describe('test halson library', () => {
  test('should customize the links with another info', () => {
    const player = {
      id: 'playerId',
      name: 'playerName',
    };

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

  test('should test documentation example', () => {
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

    expect(resource.title).toEqual('john doe');
    expect(resource.username).toEqual('doe');
    expect(resource.emails[0]).toEqual('john.doe@example.com');
    expect(resource.getLink('self')).toEqual({
      href: '/doe',
    });
    /* console.log(Object.keys(resource));
    console.log(resource.getEmbed('starred'));
    console.log(JSON.stringify(resource)); */
  });
});
