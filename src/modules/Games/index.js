import { Link } from 'react-router-dom';
import { Card, Table, Button, Popconfirm, message } from 'antd';
import { useState, useEffect } from "react";
import { DataStore } from 'aws-amplify';
import { Game } from '../../models';

const Games = () => {

    const [games, setGames] = useState([]);

    useEffect(() => {
        DataStore.query(Game).then(setGames);
    }, []);
    
    const deleteGame = async (item) => {
        await DataStore.delete(Game, d => d.id.eq(item.id));
        setGames(games.filter((d) => d.id !== item.id));
        message.success('Game has been deleted.');
    };

    const GameTable = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (_, item) => (
                <div>
                    <a href={item.game} target='_blank' rel="noreferrer">
                        {item.title}
                    </a>
                </div>

            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, item) => (
                <div>
                    <Popconfirm
                        placement="topLeft"
                        title={'Are you sure you want to delete this Game?'}
                        onConfirm={() => deleteGame(item)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger type='primary' style={{ margin: 10 }}>Remove</Button>
                    </Popconfirm>
                    <Link to={`updategame/${item.id}`}>
                        <Button type='primary' style={{ margin: 10 }}>Update</Button>
                    </Link>
                </div>

            )
        }
    ];

    const renderNewItemButton = () => {
        return (
            <Link to={'game'}>
                <Button type='primary'>Add Game</Button>
            </Link>
        );
    };

    return (
        <div>
            <Card title={'Games'} style={{ margin: 20 }} extra={renderNewItemButton()}>
                <Table
                    dataSource={games}
                    columns={GameTable}
                    rowKey='id' />
            </Card>
        </div>
    );
};

export default Games;