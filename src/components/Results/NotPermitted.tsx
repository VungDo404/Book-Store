import { Button, Result } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

export default function NotPermitted(){
    const { t } = useTranslation();
    return (
        <Result
            status="403"
            title="403"
            subTitle={t("NotPermitted.subTitle")}
            extra={<Button type="primary"><Link to="/">{t("NotPermitted.extra")}</Link></Button>}
        />
    );
}