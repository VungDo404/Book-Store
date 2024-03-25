import { Layout } from "antd";
import { useTranslation } from "react-i18next";

const { Footer } = Layout;

export default function FooterComponent() {
	const { t } = useTranslation();
	return (
		<Footer
			style={{
				textAlign: "center",
				backgroundColor: "rgb(249, 250, 255)",
			}}
		>
			{t("footer.info")}
		</Footer>
	);
}
