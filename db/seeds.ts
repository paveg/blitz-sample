import db from "./index"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */

const amount = 100000

const percentage = {
  0: 0.5,
  1: 0.25,
  2: 0.2,
  3: 0.05,
}

const seed = async () => {
  for (let i = 0; i < 4; i++) {
    await db.user.create({
      data: {
        name: "user_" + i,
        email: "test-user+" + i + "@example.com",
        hashedPassword:
          "JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJGc2cFdpS2lIKzczSDVBYlRISnpKSVEkb3BzdHNHa1dLWmJMbEd1U0doLzBwb3FFbzJzb2tPYUJIZkZiUkxWeHF3bwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
        gameGroups: {
          create: [{}],
        },
      },
    })
  }
}

export default seed
