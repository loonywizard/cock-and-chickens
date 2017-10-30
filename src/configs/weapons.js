const weaponsConfig = {
  currentWeapon: 'gun',
  weapons: {
    gun: {
      isInAmmunition: true,
      ammunitionCount: 12,
      keyName: '1',
      imageUrl: 'images/gun.png',
      size: {
        x: 53,
        y: 40,
      },
    },
    machineGun: {
      isInAmmunition: false,
      ammunitionCount: 0,
      keyName: '2',
      imageUrl: 'images/machineGun.png',
      size: {
        x: 112,
        y: 40,
      },
    },
    shotgun: {
      isInAmmunition: false,
      ammunitionCount: 0,
      keyName: '3',
      imageUrl: 'images/shotgun.png',
      size: {
        x: 77,
        y: 53,
      },
    },
  },
};

export default weaponsConfig;