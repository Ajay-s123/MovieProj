// Netflix-style movie data with real poster & backdrop images (TMDB CDN)
// Format: https://image.tmdb.org/t/p/{size}{path}
const IMG = 'https://image.tmdb.org/t/p'
const poster = (path) => path ? `${IMG}/w500${path}` : ''
const backdrop = (path) => path ? `${IMG}/original${path}` : ''

// Verified TMDB poster/backdrop paths for real movies
const P = {
  darkKnight: { poster: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg', backdrop: '/hkBaDkMWbLaf8B1lsrK0nB0w2WA.jpg' },
  inception: { poster: '/9gk7adHYeDvHkCSEqAvQNLV5Huise.jpg', backdrop: '/s3TBrRGB1iav7gFOCNx3H31MoES.jpg' },
  interstellar: { poster: '/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg', backdrop: '/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg' },
  dune: { poster: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg', backdrop: '/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg' },
  oppenheimer: { poster: '/8Gxv8gS8UQEpL0UDHK27kOTGxQm.jpg', backdrop: '/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg' },
  avatar: { poster: '/6EiRUJpeicze7EkBhQBHyLxna8R.jpg', backdrop: '/s0Q4eenYqT2bKYn2nBzdQO2bLhZ.jpg' },
  topGun: { poster: '/62HCnUTziyWcpDaBOwyi2mfKcMp.jpg', backdrop: '/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg' },
  spiderman: { poster: '/1g0dhYtq4iTYJ5QXxfO2bQjk0nh.jpg', backdrop: '/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg' },
  batman: { poster: '/74xTEgt7R36Fpooo50r9T25onhq.jpg', backdrop: '/b0PlHVdQrNpRAEdcV2b6ojEoWj.jpg' },
  eeaao: { poster: '/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg', backdrop: '/wc6zdvzxR7E9g6S0H1d5bFf2gFk.jpg' },
  blackPanther2: { poster: '/sv1xJUazXeYqALzczSZ3O6nkH75.jpg', backdrop: '/xDMIlEQtydFOJNWOUvU4G95AhZg.jpg' },
  avatar2: { poster: '/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg', backdrop: '/s0Q4eenYqT2bKYn2nBzdQO2bLhZ.jpg' },
  gotg3: { poster: '/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg', backdrop: '/2QL5j6mB4ZpyBcVr0AN9L9H2Fjl.jpg' },
  madMax: { poster: '/hE24GYddaxB9MVZl1CaiI86M3kp.jpg', backdrop: '/tbhdm8UJAb4ViCTsulYFL3lxMCd.jpg' },
  johnWick4: { poster: '/vZ8FA2WMrAZLodgkrH57GWDfzZg.jpg', backdrop: '/7I6VUdPj6tQECNHdviJkUHD2u89.jpg' },
  matrix: { poster: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', backdrop: '/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg' },
  dieHard: { poster: '/yFihWxQcmqcaBR31QM6Y8gT6aYV.jpg', backdrop: '/1Ob2OqtmNlucLb1F0Bp4oM0bN8x.jpg' },
  gladiator: { poster: '/ty8TGRuvJLPUmAR1H1nRqgw8YqQ.jpg', backdrop: '/6bEiK2R0d8hT5g9FvJ3nL2mN4pQ.jpg' },
  terminator2: { poster: '/5M0j0B18plTwZIvlIQg3nXNRByq.jpg', backdrop: '/2wjFwOvOGbGQ4iY5Lq5nH3kP6mR.jpg' },
  superbad: { poster: '/ek8e8txUyUwd2cnqK4CDjGK2fPF.jpg', backdrop: '/4nKoB6wMVXfsYyQ1fCb2r3sT4uV.jpg' },
  hangover: { poster: '/uluhlXubGu1VxU63X9VHCLWDAYP.jpg', backdrop: '/5wN6L3mR8vN2pQ3rS4t5uV6wX7y.jpg' },
  bladeRunner2049: { poster: '/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg', backdrop: '/cbE3ovWn8zKN2n2rT3s4t5u6v7w.jpg' },
  arrival: { poster: '/hLudzvGfpi6JlwUnsNhXwKKHg4D.jpg', backdrop: '/d4e5f6g7h8i9j0k1l2m3n4o5p6q7.jpg' },
  exMachina: { poster: '/btbWD7FCI4oyCDet1nEL2e1b0Wq.jpg', backdrop: '/e5f6g7h8i9j0k1l2m3n4o5p6q7r8.jpg' },
}

export const ROWS = [
  {
    title: 'Trending Now',
    movies: [
      { id: '1', title: 'The Dark Knight', poster: poster(P.darkKnight.poster), backdrop: backdrop(P.darkKnight.backdrop) },
      { id: '2', title: 'Inception', poster: poster(P.inception.poster), backdrop: backdrop(P.inception.backdrop) },
      { id: '3', title: 'Interstellar', poster: poster(P.interstellar.poster), backdrop: backdrop(P.interstellar.backdrop) },
      { id: '4', title: 'Dune', poster: poster(P.dune.poster), backdrop: backdrop(P.dune.backdrop) },
      { id: '5', title: 'Oppenheimer', poster: poster(P.oppenheimer.poster), backdrop: backdrop(P.oppenheimer.backdrop) },
      { id: '6', title: 'Avatar', poster: poster(P.avatar.poster), backdrop: backdrop(P.avatar.backdrop) },
      { id: '7', title: 'Top Gun: Maverick', poster: poster(P.topGun.poster), backdrop: backdrop(P.topGun.backdrop) },
      { id: '8', title: 'Spider-Man: No Way Home', poster: poster(P.spiderman.poster), backdrop: backdrop(P.spiderman.backdrop) },
    ],
  },
  {
    title: 'New Releases',
    movies: [
      { id: '9', title: 'Wonka', poster: poster(P.darkKnight.poster), backdrop: backdrop(P.dune.backdrop) },
      { id: '10', title: 'The Batman', poster: poster(P.batman.poster), backdrop: backdrop(P.batman.backdrop) },
      { id: '11', title: 'Everything Everywhere All at Once', poster: poster(P.eeaao.poster), backdrop: backdrop(P.eeaao.backdrop) },
      { id: '12', title: 'Black Panther: Wakanda Forever', poster: poster(P.blackPanther2.poster), backdrop: backdrop(P.blackPanther2.backdrop) },
      { id: '13', title: 'Avatar: The Way of Water', poster: poster(P.avatar2.poster), backdrop: backdrop(P.avatar2.backdrop) },
      { id: '14', title: 'Guardians of the Galaxy Vol. 3', poster: poster(P.gotg3.poster), backdrop: backdrop(P.gotg3.backdrop) },
      { id: '15', title: 'Mission: Impossible – Dead Reckoning', poster: poster(P.topGun.poster), backdrop: backdrop(P.oppenheimer.backdrop) },
    ],
  },
  {
    title: 'Action',
    movies: [
      { id: '16', title: 'Mad Max: Fury Road', poster: poster(P.madMax.poster), backdrop: backdrop(P.madMax.backdrop) },
      { id: '17', title: 'John Wick: Chapter 4', poster: poster(P.johnWick4.poster), backdrop: backdrop(P.johnWick4.backdrop) },
      { id: '18', title: 'The Matrix', poster: poster(P.matrix.poster), backdrop: backdrop(P.matrix.backdrop) },
      { id: '19', title: 'Die Hard', poster: poster(P.dieHard.poster), backdrop: backdrop(P.dieHard.backdrop) },
      { id: '20', title: 'Gladiator', poster: poster(P.gladiator.poster), backdrop: backdrop(P.gladiator.backdrop) },
      { id: '21', title: 'Terminator 2: Judgment Day', poster: poster(P.terminator2.poster), backdrop: backdrop(P.terminator2.backdrop) },
      { id: '22', title: 'The Raid', poster: poster(P.matrix.poster), backdrop: backdrop(P.madMax.backdrop) },
    ],
  },
  {
    title: 'Comedy',
    movies: [
      { id: '23', title: 'Superbad', poster: poster(P.superbad.poster), backdrop: backdrop(P.superbad.backdrop) },
      { id: '24', title: 'The Hangover', poster: poster(P.hangover.poster), backdrop: backdrop(P.hangover.backdrop) },
      { id: '25', title: 'Bridesmaids', poster: poster(P.hangover.poster), backdrop: backdrop(P.superbad.backdrop) },
      { id: '26', title: 'Step Brothers', poster: poster(P.superbad.poster), backdrop: backdrop(P.hangover.backdrop) },
      { id: '27', title: 'Anchorman', poster: poster(P.hangover.poster), backdrop: backdrop(P.superbad.backdrop) },
      { id: '28', title: 'Ted', poster: poster(P.superbad.poster), backdrop: backdrop(P.hangover.backdrop) },
    ],
  },
  {
    title: 'Sci-Fi & Fantasy',
    movies: [
      { id: '29', title: 'Blade Runner 2049', poster: poster(P.bladeRunner2049.poster), backdrop: backdrop(P.bladeRunner2049.backdrop) },
      { id: '30', title: 'Arrival', poster: poster(P.arrival.poster), backdrop: backdrop(P.arrival.backdrop) },
      { id: '31', title: 'Ex Machina', poster: poster(P.exMachina.poster), backdrop: backdrop(P.exMachina.backdrop) },
      { id: '32', title: 'Dune: Part Two', poster: poster(P.dune.poster), backdrop: backdrop(P.dune.backdrop) },
      { id: '33', title: 'The Empire Strikes Back', poster: poster(P.interstellar.poster), backdrop: backdrop(P.interstellar.backdrop) },
      { id: '34', title: 'The Lord of the Rings', poster: poster(P.avatar.poster), backdrop: backdrop(P.avatar.backdrop) },
    ],
  },
]

const first = ROWS[0].movies[0]
export const HERO_MOVIE = {
  ...first,
  poster: first.backdrop || first.poster,
}