import { styled } from "styled-components";
import { useParams } from "react-router-dom";

interface RouteParams {
    coinId: string;
}

const Title = styled.h1`
  color: ${props => props.theme.accentColor};  
`;

function Coin(){
    const {coinId} = useParams<RouteParams>();
    
    return (
        <Title>
            Coin: {coinId}
        </Title>
    );
}

export default Coin;