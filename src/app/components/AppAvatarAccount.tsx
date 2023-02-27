import { Avatar, Card } from 'antd';
import { useEffect, useState } from 'react'
import agent from '../api/agent';
import { Account } from '../models/Account';
import { Result } from '../models/Interfaces/IResponse';

const AppAvatarAccount = ({ accountId }: any) => {
    const [account, setAccount] = useState<Account | null>(null);
    useEffect(() => {
        const loadAccount = async () => {
            const { result, isSuccess, statusCode }: Result = await agent.Account.currentAccount({accountId : accountId});
            if (isSuccess === true && statusCode === 200) setAccount(result);
        }
        loadAccount();
    }, []);
    return <Card.Meta
        avatar={<Avatar src={account?.imageUrl} />}
        title={account?.firstName}
    />;
}

export default AppAvatarAccount