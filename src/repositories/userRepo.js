import prisma from '../config/db.js';

export async function createUser(data) {
  return await prisma.user.create({
    data: {
      UserName: data.userName,
      Email: data.email,
      Password_hash: data.password_hash,
      Role: data.role
    },
    select: {
      USER_ID: true,
      UserName: true,
      Email: true,
      Role: true,
      Created_at: true
    }
  });
}

export async function findUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { Email: email }
  });
}

export async function findUserById(userId) {
  return await prisma.user.findUnique({
    where: { USER_ID: userId },
    select: {
      USER_ID: true,
      UserName: true,
      Email: true,
      Role: true,
      Created_at: true
    }
  });
}

export async function findAllUsers() {
  return await prisma.user.findMany({
    select: {
      USER_ID: true,
      UserName: true,
      Email: true,
      Role: true,
      Created_at: true
    }
  });
}

export async function updateUserById(userId, data) {
  const updateData = {};
  if (data.userName !== undefined) updateData.UserName = data.userName;
  if (data.email !== undefined) updateData.Email = data.email;
  if (data.password_hash !== undefined) updateData.Password_hash = data.password_hash;
  if (data.role !== undefined) updateData.Role = data.role;

  return await prisma.user.update({
    where: { USER_ID: userId },
    data: updateData,
    select: {
      USER_ID: true,
      UserName: true,
      Email: true,
      Role: true,
      Created_at: true
    }
  });
}

export async function deleteUserById(userId) {
  return await prisma.user.delete({
    where: { USER_ID: userId }
  });
}

export async function findUserReviewsByUserId(userId) {
  return await prisma.review.findMany({
    where: { User_ID: userId },
    include: {
      Movie: {
        select: {
          Id: true,
          Title: true,
          Description: true
        }
      }
    },
    orderBy: {
      Created_at: 'desc'
    }
  });
}




