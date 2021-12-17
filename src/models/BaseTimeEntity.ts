import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { LocalDateTimeTransformer } from './transformer/LocalDateTimeTransformer';

// 추상 클래스로 구현하여 id 등의 필수값을 Overload하여 사용할 수 있도록 구현함
export abstract class BaseTimeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 생성 일시
  @CreateDateColumn({
    type: 'timestamptz',
    nullable: false,
  })
  createdDt: Date;

  // 업데이트 일시
  @UpdateDateColumn({
    type: 'timestamptz',
    nullable: false,
  })
  updatedDt: Date;
}
