# Uni-clone

Uni-clone là dự án ứng dụng ví crypto kết hợp swap/token dashboard, được xây dựng theo hướng fullstack và dễ mở rộng trong các giai đoạn phát triển tiếp theo. Hiện tại repository tập trung vào frontend, kiến trúc giao diện và tổ chức domain UI, đồng thời đã chuẩn bị sẵn nền tảng để tích hợp backend/API thật. Ứng dụng hướng đến trải nghiệm quản lý tài sản số với giao diện responsive cho mobile và desktop.

## Tính năng chính

- Đăng ký và đăng nhập với form validation bằng `react-hook-form` và `zod`.
- Dashboard tổng quan tài sản, số dư và danh sách token.
- Quản lý ví: tạo ví, thêm ví, xem danh sách ví của người dùng.
- Trang chi tiết token với biểu đồ giá dạng candle/line.
- Các luồng thao tác nhanh như send, receive, buy/sell, swap qua bottom sheet và form riêng.
- Điều hướng tách biệt cho mobile và desktop.
- Hỗ trợ PWA để có thể cài như ứng dụng trên thiết bị.

## Getting Started

### 1. Cài đặt dependencies

```bash
pnpm install
```

### 2. Tạo file môi trường

```bash
cp .env.example .env
```

Hiện tại project chưa sử dụng biến môi trường thực tế, nhưng vẫn giữ bước này để thống nhất quy trình setup và sẵn sàng cho việc tích hợp API sau này.

### 3. Chạy môi trường phát triển

```bash
pnpm dev
```

Sau đó mở `http://localhost:3000`.

## Scripts

- `pnpm dev`: chạy Next.js ở môi trường development với Turbopack.
- `pnpm build`: build production.
- `pnpm start`: chạy bản build production.
- `pnpm lint`: kiểm tra lint với ESLint.
- `pnpm typecheck`: kiểm tra kiểu dữ liệu TypeScript.
- `pnpm format`: format mã nguồn bằng Prettier.

## Tech Stack

### Core

- `Next.js 16`: dùng App Router để tổ chức route rõ ràng, hỗ trợ SSR/SPA hybrid và phù hợp cho các app frontend hiện đại.
- `React 19`: xây UI theo component, dễ tái sử dụng và mở rộng.
- `TypeScript`: tăng độ an toàn kiểu dữ liệu, đặc biệt hữu ích khi dự án có nhiều entity như user, wallet, token, transaction.

### UI và Styling

- `Tailwind CSS v4`: giúp xây giao diện nhanh, nhất quán và dễ scale theo component.
- `shadcn/ui` + `Radix UI`: cung cấp nền tảng component accessible, dễ custom theo design system riêng.
- `Lucide React`: bộ icon gọn nhẹ, đồng nhất phong cách.
- `Framer Motion` / `motion`: hỗ trợ animation và chuyển động mượt hơn cho trải nghiệm người dùng.
- `Sonner`: hiển thị toast notification đơn giản và đẹp.
- `Vaul`: phù hợp cho bottom sheet trên mobile.

### Form, Validation và State

- `react-hook-form`: quản lý form hiệu quả, ít re-render.
- `zod`: khai báo schema validation rõ ràng và đồng bộ tốt với TypeScript.
- `@hookform/resolvers`: kết nối `react-hook-form` với `zod`.
- `Zustand`: state management gọn nhẹ cho dữ liệu người dùng/wallet ở client.
- `@tanstack/react-query`: chuẩn bị sẵn lớp quản lý server state và cache khi tích hợp API thật.

### Chart và dữ liệu hiển thị

- `lightweight-charts`: phù hợp cho biểu đồ nến/token chart vì nhẹ và tối ưu cho dữ liệu tài chính.
- `recharts`: dùng tốt cho các dạng biểu đồ UI/dashboard khác khi cần.

### PWA và DX

- `@ducanh2912/next-pwa`: bổ sung khả năng PWA để ứng dụng có thể cài trên thiết bị.
- `ESLint` + `Prettier`: giữ code sạch, dễ đọc và thống nhất style trong team.
- `Husky`: sẵn sàng cho việc tự động hóa kiểm tra code trước commit.

## Cấu trúc thư mục

```text
app/
components/
container/
data/
hooks/
lib/
provider/
public/
schema/
store/
types/
```

### `app/`

Chứa routing theo App Router của Next.js. Mỗi thư mục đại diện cho một route hoặc route group như `(auth)`, `user`, `token`, `add-wallet`. Đây là tầng điều hướng, layout, error/loading và entry point của từng màn hình.

### `components/`

Chứa các UI component tái sử dụng ở mức nhỏ đến vừa:

- `ui/`: primitive component và base component dùng xuyên suốt app.
- `layout/`: thành phần khung như navbar mobile/desktop.
- `charts/`: các component biểu đồ.
- `custom/`: component custom theo nghiệp vụ hoặc giao diện riêng.

Mục tiêu của tầng này là tái sử dụng cao và không gắn quá chặt với một màn hình cụ thể.

### `container/`

Chứa phần triển khai UI theo từng màn hình hoặc domain nghiệp vụ như `home`, `auth`, `token`, `my-wallet`. Đây là nơi ghép nhiều component nhỏ lại thành section, form, bottom sheet và page-level UI. Có thể xem đây là tầng "feature modules" của dự án.

### `data/`

Chứa dữ liệu tạm phục vụ quá trình phát triển giao diện và kiểm thử luồng trước khi backend/API thật được tích hợp đầy đủ, ví dụ danh sách token, lịch sử giao dịch, phương thức thêm ví.

### `hooks/`

Chứa custom hooks dùng lại trong nhiều nơi như kiểm tra mobile, trạng thái mạng, tìm kiếm, cài đặt PWA.

### `lib/`

Chứa utility và cấu hình dùng chung như `utils.ts`, `nav-config.tsx`. Đây là nơi để các hàm helper hoặc config không thuộc domain cụ thể.

### `provider/`

Chứa các provider cấp cao cho toàn ứng dụng, hiện có `QueryClientProvider` để chuẩn bị cho việc quản lý server state với React Query.

### `public/`

Chứa static asset như icon, manifest, service worker và các file phục vụ PWA.

### `schema/`

Chứa schema validation bằng `zod`, tách riêng rule nghiệp vụ của form đăng nhập/đăng ký khỏi UI component để dễ bảo trì.

### `store/`

Chứa client state dùng chung, hiện tại dự án dùng `Zustand` để lưu thông tin user/wallet mock.

### `types/`

Chứa các kiểu dữ liệu TypeScript cho token, user, wallet, chart, transaction... giúp toàn bộ codebase dùng chung một ngôn ngữ kiểu dữ liệu thống nhất.

## Tư duy kiến trúc

Dự án được tách theo 3 lớp rõ ràng:

- `app`: quản lý route, layout và lifecycle của màn hình.
- `container`: quản lý logic ghép màn hình theo feature.
- `components`: quản lý các mảnh UI tái sử dụng.

Cách chia này giúp người mới vào dự án dễ xác định:

- sửa route hoặc layout ở đâu,
- sửa phần nghiệp vụ của từng màn hình ở đâu,
- và tái sử dụng component chung ở đâu.

## Ghi chú

- Repository hiện ưu tiên phần frontend để hoàn thiện trải nghiệm và kiến trúc trước.
- React Query, provider và cấu trúc thư mục đã được chuẩn bị để tích hợp backend/API thật ở giai đoạn tiếp theo.
- Nếu team bắt đầu dùng biến môi trường, chỉ cần bổ sung vào `.env.example` để giữ onboarding nhất quán.
