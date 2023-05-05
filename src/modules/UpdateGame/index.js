import { Form, Input, Button, Card, message } from 'antd';
import { useState, useEffect } from "react";
import { Game } from '../../models';
import { DataStore } from 'aws-amplify';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const UpdateGame = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [g, setG] = useState(null);
    const [title, setTitle] = useState('');
    const [game, setGame] = useState('');
    const [solution, setSolution] = useState('');
    const [note, setNote] = useState('');

    useEffect(() => {
        if (!id) {
            return;
        }
        DataStore.query(Game, id).then(setG);

    }, [id])
    useEffect(() => {
        if (!g) {
            return;
        }
        setTitle(g.title);
        setGame(g.game);
        setSolution(g.solution);
        setNote(g.note);

    }, [g]);

    const urlPatternValidation = (uri) => {
        const regex = new RegExp("((https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)");
        return regex.test(uri);
    };

    const updategame = async () => {
    
        if (!title) {
            message.error('Title required!');
            return;
        }
        if (!game || !urlPatternValidation(game)) {
            message.error('Valid Game link required!');
            return;
        }
        if (!solution || !urlPatternValidation(solution)) {
            message.error('Valid Solution link required!');
            return;
        }

        const updatedGame = await DataStore.save(
            Game.copyOf(g, (updated) => {
                updated.title = title;
                updated.solution = solution;
                updated.note = note;
                updated.game = game;

            })
        )
        setG(updatedGame);
        message.success("Game has been updated!");
        navigate('/');
    };

    return (
        <Card title={'Update'} style={{ margin: 20 }}>
        <Form layout='vertical'>
            
            <Form.Item label={'Title'} required>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Item>
            <Form.Item label={'Game'} required>
                <Input
                    value={game}
                    onChange={(e) => setGame(e.target.value)}
                />
            </Form.Item>
            <Form.Item label={'Solution'} required>
                <Input
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                />
            </Form.Item>
            <Form.Item label={'Note'}>
                <Input
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit'
                    onClick={updategame}
                >Submit</Button>
            </Form.Item>
        </Form>
    </Card>
    );
};

export default UpdateGame;