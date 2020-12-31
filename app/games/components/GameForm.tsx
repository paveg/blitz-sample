import React from "react"

type GameFormProps = {
  initialValues: any
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const GameForm = ({ initialValues, onSubmit }: GameFormProps) => {
  console.log(initialValues)

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
      <input placeholder="人数" defaultValue={initialValues.headCount} />
      <br />
      <input placeholder="着順" defaultValue={initialValues.rank} />
      <br />
      <input placeholder="点数" defaultValue={initialValues.score} />
      <br />
      <input placeholder="ゲームグループ" defaultValue={initialValues.gameGroup} />
      <div>{JSON.stringify(initialValues)}</div>
      <button>Submit</button>
    </form>
  )
}

export default GameForm
