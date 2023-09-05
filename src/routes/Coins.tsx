import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
    padding: 0px 20px;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color: ${props => props.theme.bgColor};
    padding: 20px;
    border-radius: 15px;
    margin-bottom: 10px;
    a{
        transition: color 0.5s ease-in;
        display: block;
        display: flex;
        align-items: center;
    }
    &:hover{
        a{
            color: ${props => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color:${props => props.theme.accentColor};
`;

const Loader = styled.div`
    text-align:center;
`;

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string
}

function Coins(){
    const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins);

    return (
        <Container>
            <Header>
                <Title>Coins</Title>
            </Header>
            {isLoading ? <Loader>Loading...</Loader> : (
                <CoinList>
                    {
                        data?.map((coin) => (
                            <Coin key={coin.id}>
                                <Link to={{
                                    pathname: `${coin.id}`,
                                    state: {name: coin.name},
                                }}>
                                    {/* <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} /> */}
                                    {coin.name} 
                                    &rarr;
                                    </Link>
                            </Coin>
                        ))
                    }
                </CoinList>
            )}
        </Container>
    );
}

export default Coins;