const decode = (state = '[]'): GameState => JSON.parse(state)
const encode = (state: GameState): string => JSON.stringify(state)

export const useGameState = () => {
  const router = useRouter()

  const state = useCookie<GameState>('state', {
    encode,
    decode,
    default: () => [],
  })

  async function submitGuess(guess: string) {
    state.value = await $fetch('/api/guess', {
      method: 'POST',
      body: { guess },
    })
  }

  function resetGame() {
    // state.value = []
    let date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    let expires = "; expires=" + date.toUTCString();
    document.cookie = "state=[]" +expires+ "; path=/";
    router.push('/');
  }

  return { state, submitGuess, resetGame }
}
