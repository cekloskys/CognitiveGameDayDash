import { Form, Input, Button, Card, message } from 'antd';
import { DataStore } from 'aws-amplify';
import { Game } from '../../models';
import { useNavigate } from "react-router-dom";

const AddGame = () => {

    const navigate = useNavigate();

    const urlPatternValidation = (uri) => {
        const regex = new RegExp("((https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)");
        return regex.test(uri);
    };

    const onFinish = async ({ title, game, solution, note }) => {

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


        await DataStore.save(
            new Game({
                title,
                game,
                solution,
                note,
            }));
        message.success('Game has been created!')
        navigate('/');
    }

    return (
        <Card title={'Create Game'} style={{ margin: 20 }}>
            <Form layout='vertical' onFinish={onFinish}>

                <Form.Item label={'Title'} required name='title'>
                    <Input placeholder='Enter A Title' />
                </Form.Item>
                <Form.Item label={'Game'} required name='game'>
                    <Input placeholder='Enter game url Ex: https://www.hostinger.com' />
                </Form.Item>
                <Form.Item label={'Solution'} required name='solution'>
                    <Input placeholder='Enter solution url Ex: https://www.hostinger.com' />
                </Form.Item>
                <Form.Item label={'Note'} name='note'>
                    <Input placeholder='Enter A Note' />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default AddGame;