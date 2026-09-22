import {App, Block, Button} from "konsta/react";

function MyApp() {
  return (
      <App theme="ios" className="k-ios" dark>
        <Block>
          <p>Um pequeno bloquinho</p>
        </Block>
        <Block className="space-y-4">
          <p>Aqui vem o botão</p>
          <Button>Ação</Button>
        </Block>
      </App>
  )
}

export default MyApp
